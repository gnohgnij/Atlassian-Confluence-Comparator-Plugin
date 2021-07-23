package dso.plugin;

import com.atlassian.confluence.pages.actions.AbstractPageAwareAction;
import com.atlassian.confluence.pages.AbstractPage;
import com.opensymphony.xwork.Action;

public class ComparatorPluginAction extends AbstractPageAwareAction {

    private AbstractPage abstractPage;

    public AbstractPage getPage(){
        return this.abstractPage;
    }

    public void setPage(AbstractPage page){
        this.abstractPage = page;
    }

    public String execute() throws Exception {
        return Action.SUCCESS;
    }

}